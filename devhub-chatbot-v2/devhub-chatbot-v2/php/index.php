<?php
session_start();

$usersFile = __DIR__ . '/users.json';
$users = [];
if (file_exists($usersFile)) {
    $contents = file_get_contents($usersFile);
    $users = json_decode($contents, true) ?: [];
}

$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if ($username === '' || $password === '') {
        $message = 'Please enter both username and password.';
    } else {
        $found = null;
        foreach ($users as $index => $user) {
            if (strtolower($user['username']) === strtolower($username)) {
                $found = [$index, $user];
                break;
            }
        }

        if ($found !== null) {
            list($index, $user) = $found;
            if (password_verify($password, $user['password'])) {
                $_SESSION['username'] = $user['username'];
                header('Location: profile.php');
                exit;
            }
            $message = 'Password is incorrect. Try again.';
        } else {
            $newUser = [
                'username' => $username,
                'password' => password_hash($password, PASSWORD_DEFAULT),
                'display_name' => $username,
                'picture' => ''
            ];
            $users[] = $newUser;
            file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
            $_SESSION['username'] = $username;
            header('Location: profile.php');
            exit;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Login - DevHub</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="php-header">
        <div class="php-header-brand">
            <span class="php-brand-icon">💻</span>
            <span class="php-brand-name">DevSpace</span>
        </div>
        <a class="php-header-link" href="../index.html">Back to site</a>
    </header>
    <div class="page-shell">
        <div class="card">
            <h1>Welcome</h1>
            <p>Login with an existing account or create a new one instantly.</p>
            <?php if ($message): ?>
                <div class="alert"><?php echo htmlspecialchars($message); ?></div>
            <?php endif; ?>
            <form method="POST" action="index.php">
                <label for="username">Username</label>
                <input id="username" name="username" type="text" required>

                <label for="password">Password</label>
                <input id="password" name="password" type="password" required>

                <button type="submit">Login / Register</button>
            </form>
            <p class="note">After logging in, you can add your display name and upload your picture.</p>
        </div>
    </div>
</body>
</html>
