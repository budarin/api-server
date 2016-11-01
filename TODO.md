- навесить хук post-merge на изменение в package.json на запуск yarn install
- настроить istanbul под Windows
- на время теста подменять dbQuery на тестовую функцию (возвращающую тестовые данные для тестов)
- добавить redis для хранения токенов (если не найден токен идем в базу и записываем в redis если не находим - пишем с истекшим сроком)
- возвращать юзеру scope = role













### 1.0.2
- add support Yandex Key QR Code athorization

### 1.0.1
- add support OTP passport athorization


renew token
curl -XPOST -d 'grant_type=refresh_token&client_id=trackr&refresh_token=613d5478c3a6eb65d6a5c038818e8e78306f0958&client_secret=admin' http://localhost:3000/oauth2/token

get access token
curl -XPOST -d 'username=admin&password=admin&grant_type=password&client_id=trackr&client_secret=admin' http://localhost:3000/oauth2/token

request for data
curl -H "Authorization: Bearer 1684456ae24a572d8cfd51a5d8cb58135782612d" http://localhost:3000/api/v1/test/select