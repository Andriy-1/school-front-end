pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'github_token', url: 'https://github.com/Andriy-1/school-front-end.git']])
            }
        }
        
        stage('Update Frontend') {
            steps {
				sh 'cd /home/server/school-ngx-dok/frontend/'
				sh 'git pull'
            }
        }
    }
}
