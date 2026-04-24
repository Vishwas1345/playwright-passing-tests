import jetbrains.buildServer.configs.kotlin.*
import jetbrains.buildServer.configs.kotlin.buildFeatures.perfmon
import jetbrains.buildServer.configs.kotlin.buildSteps.script
import jetbrains.buildServer.configs.kotlin.triggers.vcs

version = "2024.03"

project {
    buildType(PlaywrightTests)
}

object PlaywrightTests : BuildType({
    name = "Playwright Tests"

    vcs {
        root(DslContext.settingsRoot)
    }

    steps {
        script {
            name = "Install dependencies"
            scriptContent = "npm ci"
        }

        script {
            name = "Install Playwright browsers"
            scriptContent = "npx playwright install --with-deps"
        }

        script {
            name = "Run Playwright tests"
            scriptContent = "npx playwright test || true"
        }

        script {
            name = "Upload results to TestDino"
            scriptContent = """npx tdpw upload ./playwright-report --token="%env.TESTDINO_TOKEN%""""
        }
    }

    triggers {
        vcs {
            branchFilter = "+:main"
        }
    }

    features {
        perfmon {}
    }

    artifactRules = """
        playwright-report/** => playwright-report.zip
        test-results/** => test-results.zip
    """.trimIndent()

    failureConditions {
        executionTimeoutMin = 60
    }

    requirements {
        // Requires a build agent with Node.js 20 installed
        contains("system.agent.name", "node")
    }
})
