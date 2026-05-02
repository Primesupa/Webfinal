<?php
session_start();

if (empty($_SESSION['username'])) {
    header('Location: index.php');
    exit;
}

$usersFile = __DIR__ . '/users.json';
$uploadsDir = __DIR__ . '/uploads';
if (!is_dir($uploadsDir)) {
    mkdir($uploadsDir, 0755, true);
}

$users = [];
if (file_exists($usersFile)) {
    $contents = file_get_contents($usersFile);
    $users = json_decode($contents, true) ?: [];
}

$currentUser = null;
foreach ($users as $index => $user) {
    if (strtolower($user['username']) === strtolower($_SESSION['username'])) {
        $currentUser = &$users[$index];
        break;
    }
}

if ($currentUser === null) {
    session_destroy();
    header('Location: index.php');
    exit;
}

$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $displayName = trim($_POST['display_name'] ?? '');
    if ($displayName !== '') {
        $currentUser['display_name'] = $displayName;
    }

    if (!empty($_FILES['picture']['name'])) {
        $picture = $_FILES['picture'];
        if ($picture['error'] === UPLOAD_ERR_OK) {
            $allowed = ['jpg', 'jpeg', 'png', 'gif'];
            $ext = strtolower(pathinfo($picture['name'], PATHINFO_EXTENSION));
            if (in_array($ext, $allowed)) {
                $filename = preg_replace('/[^a-zA-Z0-9_-]/', '', strtolower($currentUser['username']));
                $filename .= '-' . time() . '.' . $ext;
                $filepath = $uploadsDir . '/' . $filename;
                if (move_uploaded_file($picture['tmp_name'], $filepath)) {
                    $currentUser['picture'] = 'uploads/' . $filename;
                } else {
                    $message = 'Upload failed. Please try again.';
                }
            } else {
                $message = 'Only JPG, PNG, and GIF images are allowed.';
            }
        } else {
            $message = 'Upload error. Please try again.';
        }
    }

    if ($message === '') {
        file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
        header('Location: ../index.html');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile - DevHub</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="php-header">
        <div class="php-header-brand">
            <span class="php-brand-icon">💻</span>
            <span class="php-brand-name">DevSpace</span>
        </div>
        <div class="php-header-actions">
            <a class="php-header-link" href="../index.html">Main site</a>
            <a class="php-header-link" href="logout.php">Logout</a>
        </div>
    </header>
    <div class="page-shell">
        <div class="card card-profile">
            <div class="top-row">
                <h1>Hello, <?php echo htmlspecialchars($currentUser['display_name']); ?></h1>
            </div>

            <?php if ($message): ?>
                <div class="alert"><?php echo htmlspecialchars($message); ?></div>
            <?php endif; ?>

            <div class="profile-preview">
                <?php if (!empty($currentUser['picture'])): ?>
                    <img src="<?php echo htmlspecialchars($currentUser['picture']); ?>" alt="Profile picture">
                <?php else: ?>
                    <div class="avatar-placeholder">No photo</div>
                <?php endif; ?>
                <div>
                    <p><strong>Username:</strong> <?php echo htmlspecialchars($currentUser['username']); ?></p>
                    <p><strong>Display name:</strong> <?php echo htmlspecialchars($currentUser['display_name']); ?></p>
                </div>
            </div>

            <form method="POST" action="profile.php" enctype="multipart/form-data">
                <label for="display_name">Display name</label>
                <input id="display_name" name="display_name" type="text" value="<?php echo htmlspecialchars($currentUser['display_name']); ?>">

                <label for="picture">Profile picture</label>
                <input id="picture" name="picture" type="file" accept="image/*">

                <button type="submit">Save profile</button>
            </form>
            <a class="btn-return" href="../index.html">Return to main menu</a>
        </div>
    </div>
</body>
</html>
