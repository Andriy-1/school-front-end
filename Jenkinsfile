pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(
                    branches: [[name: '*/master']],
                    extensions: [],
                    userRemoteConfigs: [[credentialsId: 'Github_config', url: 'https://github.com/Andriy-1/school-front-end.git']]
                )
            }
        }
        stage('Delete Docker Container') {
            steps {
                script {
                    sh 'docker stop frontend-jenkins'
                    sh 'docker rm frontend-jenkins'
                }
            }
        }
        stage('Delete Docker Image') {
            steps {
                script {
                    sh 'docker image rm andriyhomee/school_frontend'
                }
            }
        }
        stage('Build New Docker Image') {
            steps {
                script {
                    sh 'docker build -t andriyhomee/school_frontend:latest -f ./Dockerfile.dev .'
                }
            }
        }
        stage('Publish New Docker Image') {
            steps {
                script {
                    
                   withDockerRegistry(credentialsId: 'dockerhub-cred-andriyhomee', url: 'https://index.docker.io/v1/') {
					sh 'docker push andriyhomee/school_frontend:latest'
					}
                }
            }
   		}
        stage('Start New Docker Container Frontend') {
            steps {
                script {
                    sh 'docker run -d -p 3000:3000 --name frontend-jenkins --restart unless-stopped andriyhomee/school_frontend:latest'
                
                }
            }
        }
       
    }
}