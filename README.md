##Instalacia

npm install

---

backend.php

treba nastavit podla servra, kde bezi php.

```
/**
 * CONFIG
 */
$root = getcwd() . '/';
$host = 'http://localhost/webex/';
$image_dir = 'images/';
$db_file = $root . 'DB.json';
```

na subor DB.json nastavit prava na zapis
na zlozku images/ nastavit prava na zapis

##spustane cez npm start