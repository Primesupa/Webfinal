# PHP Login/Profile Demo

This folder contains a simple PHP login and profile example that works with XAMPP.

## Files

- `index.php` — login page. If the username does not exist, it creates a new account.
- `profile.php` — profile page where the logged-in user can update their display name and upload a profile picture.
- `logout.php` — logs out the user and returns to the login page.
- `users.json` — stores user accounts and profile data.
- `uploads/` — stores uploaded profile images.
- `style.css` — styles for the login/profile pages.

## How to run with XAMPP

1. Start XAMPP and enable `Apache` and `MySQL`.
2. Copy this `php/` folder into `C:\xampp\htdocs\`.
   - For example: `C:\xampp\htdocs\php\`
3. Open your browser and visit:
   - `http://localhost/php/index.php`
4. Enter a username and password.
   - If the username is new, the site creates a new account automatically.
5. On the profile page, upload a picture and set your display name.

## Notes

- This example stores accounts in `users.json` and does not use MySQL.
- It is designed to be simple and easy to run in XAMPP.
- For a real production site, use a proper database and stronger account security.
