<?php
session_start();
session_unset();
session_destroy();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Logged out - DevHub</title>
    <meta http-equiv="refresh" content="5;url=index.php">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="php-header">
        <div class="php-header-brand">
            <span class="php-brand-icon">💻</span>
            <span class="php-brand-name">DevSpace</span>
        </div>
        <div class="php-header-actions">
            <a class="php-header-link" href="index.php">Login again</a>
            <a class="php-header-link" href="../index.html">Main site</a>
        </div>
    </header>
    <div class="page-shell">
        <div class="card">
            <h1>You are logged out</h1>
            <p>Your session has ended successfully. You can log in again or return to the main site.</p>
            <a class="btn-return" href="index.php">Login again</a>
            <a class="btn-return" href="../index.html">Return to main site</a>
        </div>
    </div>
</body>
</html>
