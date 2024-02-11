pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Крок для витягування коду з GitHub
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'github_token', url: 'https://github.com/Andriy-1/school-front-end.git']])
            }
        }
        
        // stage('Build and Run Container') {
        //     steps {
        //         // Крок для збирання Docker контейнера
        //         sh 'docker-compose build frontend'
        //         // Крок для зупинки та видалення старого контейнера, якщо він існує
        //         sh 'docker-compose down'
        //         // Крок для запуску нового контейнера
        //         sh 'docker-compose up -d frontend'
        //     }
        // }
    }
}
