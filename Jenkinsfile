pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(
                    branches: [[name: '*/master']],
                    extensions: [],
                    userRemoteConfigs: [[credentialsId: 'github_token', url: 'https://github.com/Andriy-1/school-front-end.git']]
                )
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Команда для збирання образу Docker (наприклад, за допомогою Dockerfile у кореневій папці проекту)
                    sh 'docker build -t school_frontend:1.0.0 .'
                }
            }
        }
        stage('Publish Docker Image') {
            steps {
                script {
                   withCredentials([string(credentialsId: 'docker_hub_jenkins', variable: 'docker_hub_jenkins')]) {
					sh 'docker login -u Andriyhomee ${docker_hub_jenkins}'
					}
					sh 'docker push Andriyhomee/school_frontend'
                }
            }
   		}
    }
}
