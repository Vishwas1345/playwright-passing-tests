pipeline {
    agent {
        docker {
            image 'node:20'
            args '--ipc=host'
        }
    }

    environment {
        TESTDINO_TOKEN = credentials('TESTDINO_TOKEN')
    }

    options {
        timeout(time: 60, unit: 'MINUTES')
    }

    triggers {
        // Poll SCM every 5 minutes, or remove this block and use a webhook instead
        pollSCM('H/5 * * * *')
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright tests') {
            steps {
                sh 'npx playwright test || true'
            }
        }
    }

    post {
        always {
            // Upload results to TestDino
            sh 'npx tdpw upload ./playwright-report --token="$TESTDINO_TOKEN"'

            // Archive the HTML report and JSON results
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

            // Publish HTML report in Jenkins UI (requires HTML Publisher plugin)
            publishHTML(target: [
                allowMissing         : true,
                alwaysLinkToLastBuild: true,
                keepAll              : true,
                reportDir            : 'playwright-report',
                reportFiles          : 'index.html',
                reportName           : 'Playwright Report'
            ])
        }

        failure {
            // Archive raw test results only on failure
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
    }
}
