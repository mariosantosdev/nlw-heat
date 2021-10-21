# NLW Heat 2021

## Backend

### Routes

| Path          | Method | Body         | Params                 | NeedToken |
| ------------- | ------ | ------------ | ---------------------- | --------- |
| /authenticate | POST   | code: string |                        | false     |
| /messages     | POST   | text: string |                        | true      |
| /messages     | GET    |              | maxMessages (optional) | false     |
| /profile      | GET    |              |                        | true      |
