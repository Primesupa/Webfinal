<?php
session_start();
header('Content-Type: application/json');

$response = ['loggedIn' => false];

if (!empty($_SESSION['username'])) {
    $usersFile = __DIR__ . '/users.json';
    if (file_exists($usersFile)) {
        $users = json_decode(file_get_contents($usersFile), true) ?: [];
        foreach ($users as $user) {
            if (strtolower($user['username']) === strtolower($_SESSION['username'])) {
                $picture = $user['picture'] ?: '';
                if ($picture && strpos($picture, 'http') !== 0 && strpos($picture, '/') !== 0) {
                    $picture = 'php/' . $picture;
                }
                $response = [
                    'loggedIn' => true,
                    'username' => $user['username'],
                    'display_name' => $user['display_name'] ?: $user['username'],
                    'picture' => $picture
                ];
                break;
            }
        }
    }
}

echo json_encode($response);
