pipeline {
    agent none

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
        stage('Shard tests') {
            matrix {
                axes {
                    axis {
                        name 'SHARD'
                        values '1', '2', '3', '4'
                    }
                }
                agent {
                    docker {
                        image 'mcr.microsoft.com/playwright:v1.50.0-jammy'
                        args '--ipc=host'
                    }
                }
                stages {
                    stage('Run shard') {
                        steps {
                            sh 'npm ci'
                            sh "npx playwright test --shard=${SHARD}/4 --reporter=blob || true"
                            sh "mv blob-report blob-report-${SHARD}"
                            stash name: "blob-${SHARD}", includes: "blob-report-${SHARD}/**"
                        }
                    }
                }
            }
        }

        stage('Merge and upload') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.50.0-jammy'
                    args '--ipc=host'
                }
            }
            steps {
                sh 'npm ci'
                unstash 'blob-1'
                unstash 'blob-2'
                unstash 'blob-3'
                unstash 'blob-4'
                sh 'mkdir -p all-blob-reports && find blob-report-* -name "*.zip" -exec mv {} all-blob-reports/ \\;'
                sh '''
                    export PLAYWRIGHT_HTML_REPORT=./playwright-report
                    export PLAYWRIGHT_JSON_OUTPUT_NAME=./playwright-report/report.json
                    npx playwright merge-reports --reporter html,json ./all-blob-reports
                '''
                sh 'npx tdpw upload ./playwright-report --token="$TESTDINO_TOKEN" --upload-html --upload-traces --verbose'
            }
            post {
                always {
                    // Archive the merged HTML report and JSON results
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
            }
        }
    }
}
