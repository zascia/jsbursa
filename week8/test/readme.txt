https://docs.google.com/document/d/1BnhaHOjC1xDNTRv8E5-GitIEy-BI2WU7yrDVp1JZRbY/edit#heading=h.98huotuxurqh
тесты пишутся на jasmine (jasmine-node)
доступные к использованию сторонние библиотеки: lodash, supertest
вы не можете полагаться на запуск приложения на порту 20007
ваши тесты должны проверять коды возврата (они должны быть те же, которые были необходимы в задании #7) и все требования, сформулированные в задании #7
А. Неправильный код ответа на GET на /refreshAdmins
    1. Проверить, что дает статус 200, если указать Content-Type application/json.
    2. Проверить, что ответ сервера содержит Content-Type application/json.
B. Неправильное начальное состояние сервера при получении списка пользователей
    1. Проверить, что список пользователей = массив объектов.
    2. Проверить, что ответ сервера содержит Content-Type application/json.
C. Неправильная реакция на запрос без Content-Type
    1. Проверить что возвращается 401 при запросе GET
    2. Проверить что возвращается 401 при запросе POST
    3. Проверить что возвращается 401 при запросе PUT
    4. Проверить что возвращается 401 при запросе DELETE
D. Неправильная реакция на запрос с неправильным Content-Type
    1. Проверить что возвращается 401 при запросе GET
    2. Проверить что возвращается 401 при запросе POST
    3. Проверить что возвращается 401 при запросе PUT
    4. Проверить что возвращается 401 при запросе DELETE
E. Некорректная обработка PUT-запроса
    1. Проверить,что при запросе с правильным id и role ответ 204 и содержит хедеры
           Проверить,что он записался с правильными данными
    2. Проверить, что при запросе с правильным id без role ответ 204  содержит хедеры
           Проверить, что он записался с правильными данными и role = Student
F. Некорректная обработка PUT-запроса (администратора)
    1. Проверить,что при запросе с правильным id и role ответ 204 и содержит хедеры
       Проверить,что он записался с правильными данными
G. Некорректная обработка неверного PUT-запроса
    1. Проверить, что при запросе с неправильным id ответ 404 и содержит хедеры
       Проверить, что он не записался
H. Некорректная обработка запроса на удаление
    1. Проверить, что дает статус 204, если указать Content-Type application/json.
    2. Проверить, что ответ сервера содержит Content-Type application/json.
    3. Проверить, что после успешного запроса на удаление - пользователя нет на сервере.
I. Некорректная обработка неверного запроса на удаление
    1. Проверить, что DELETE запрос на /blablabla возвращает 404.
    2. Проверить, что DELETE запрос на /api/users/НЕСУЩЕСТВУЮЩИЙ_ID возвращает 404.
J. Некорректная обработка некорректной роли
    1. Проверить, что при POST запросе с неправильной ролью ответ 404 и содержит хедеры
K. Некорректная обработка запроса без роли
    1. Проверить, что при POST запросе без роли ответ идет 204 и содержит хедеры + id
L. Некорректная обработка запроса на создание администратора
    1. Проверить, что при запросе на создание администратора ответ 204 с хердерами и id
M. Некорректная обработка запроса на создание помощника
    1. Проверить, что при запросе на создание помощника ответ 204 с хердерами и id
