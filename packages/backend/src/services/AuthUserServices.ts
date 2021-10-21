import { User } from ".prisma/client";
import axios from "axios";
import { sign } from "jsonwebtoken";

import prisma from '../utils/prisma';

interface IAccessTokenResponse {
    access_token: string;
}

interface IGithubUser {
    id: number;
    name: string
    login: string;
    avatar_url: string;
}

type GenerateTokenData = {
    id: string;
    name: string;
    avatar_url: string;
}

export default class AuthenticateUserService {
    getGithubUser(token: string): Promise<IGithubUser> {
        return new Promise((resolve, reject) => {
            axios.get<IGithubUser>('https://api.github.com/user', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
                .then(({ data }) => resolve(data))
                .catch(error => reject(error.response));
        });
    }

    checkAlreadyExistUser(userID: number): Promise<User> {
        return new Promise((resolve, reject) => {
            prisma.user.findFirst({
                where: {
                    github_id: userID
                }
            })
                .then((users) => resolve(users ? users[0] : undefined))
                .catch((error) => reject(error));
        })
    }

    createUser(data: IGithubUser): Promise<User> {
        return new Promise((resolve, reject) => {
            const { avatar_url, login, id, name } = data;
            prisma.user.create({
                data: {
                    github_id: id,
                    name,
                    login,
                    avatar_url,
                }
            })
                .then((user) => resolve(user))
                .catch((error) => reject(error));
        });
    }

    generateToken(data: GenerateTokenData) {
        const payload = {
            user: {
                id: data.id,
                name: data.name,
                avatar_url: data.avatar_url
            }
        }

        const token = sign(payload, process.env.JWT_SECRET, { subject: data.id, expiresIn: '1d' });
        return token;
    }

    async execute(code: string) {
        const baseUrl = 'https://github.com/login/oauth/access_token';

        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(baseUrl, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                'Accept': 'application/json'
            }
        });

        const githubUser = await this.getGithubUser(accessTokenResponse.access_token);

        const existUser = await this.checkAlreadyExistUser(githubUser.id);
        const user = existUser ? existUser : await this.createUser(githubUser);

        const token = this.generateToken({
            id: user.id,
            name: user.name,
            avatar_url: user.avatar_url,
        });

        return {
            token,
            user
        }
    }
}