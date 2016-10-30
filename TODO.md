- навесить хук post-merge на изменение в package.json на запуск yarn install
- настроить istanbul под Windows

renew token
curl -XPOST -d 'grant_type=refresh_token&client_id=trackr&refresh_token=613d5478c3a6eb65d6a5c038818e8e78306f0958&client_secret=admin' http://localhost:3000/oauth2/token

get access token
curl -XPOST -d 'username=admin&password=admin&grant_type=password&client_id=trackr&client_secret=admin' http://localhost:3000/oauth2/token
curl -H "Authorization: Bearer 1684456ae24a572d8cfd51a5d8cb58135782612d" http://localhost:3000/api/v1/test/select