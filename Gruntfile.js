/*
 * App-related tasks
 */

"use strict";

module.exports = function (grunt) {

    // Show elapsed time at the end
    require("time-grunt")(grunt);

    // Load all grunt tasks
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({

        watch: {
            express: {
                files: [],
                tasks: [],
                options: {
                    spawn: false
                }
            }
        },

        // Clean Config
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            ".tmp",
                            "dist/*",
                            "server/dist"
                        ]
                    }
                ]
            },
            server: {
                files: [
                    {
                        dot: true,
                        src: [
                            "server/dist/*"
                        ]
                    }
                ]
            }
        },

        // Express Config
        express: {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                    script: "server/dist/server.js",
                    debug: true
                }
            },
            prod: {
                options: {
                    script: "server/dist/server.js",
                    debug: false
                }
            }
        },

        mochaTest: {
            service: {
                options: {
                    reporter: "spec",
                    require: ["test/globals/globals.js"],
                    timeout: 10000,
                    colors: true
                },
                src: ["test/service/**/*.js"]
            },
            api: {
                options: {
                    reporter: "spec",
                    colors: true,
                    timeout: 10000,
                    require: "test/_ts-loader"
                },
                src: ["test/_app-loader.ts", "test/api/**/*.ts"]
            }
        },

        env: {
            test: {
                NODE_ENV: "test"
            },
            local: {
                NODE_ENV: "local",
                BW_DATA_URL: "https://carlos.ucsc-cgp-dev.org"
            }
        },

        compress: {
            dist: {
                options: {
                    archive: './boardwalk.zip',
                    mode: 'zip'
                },
                files: [
                    { src: './package.json', dest: '/'},
                    { src: './views/home.html', dest: '/'},
                    { src: './server/dist/**/*.js', dest: '/'},
                    { src: './dist/**/*.*', dest: '/'}
                ]
            }
        },

        exec: {
            clearTests: {
                command: "rm -rf ./test/integration/test/test-results"
            },
            buildServer: {
                command: "cd server && tsc || true"
            },
            cleanServer: {
                command: "rm -rf server/dist"
            }
        },

        spawn: {
            buildSpa: {
                command: "npm",
                commandArgs: ["run", "build"],
                passThrough: true,
                opts: {
                    cwd: __dirname + "/spa"
                }
            }
        },

        tslint: {
            options: {
                configuration: "tslint.json",
                force: true // Build errors will be reported, but not prevent completion
            },
            files: [
                "server/src/**/*.ts"
                // "test/security/**/*.ts",
            ]
        }
    });

    // Register Tasks
    // Workon
    grunt.registerTask("workon", "Start working on this project!", [
        "clean:server",
        "exec:buildServer",
        "env:local",
        "express:dev",
        "watch"
    ]);


    // Build
    grunt.registerTask("build", "Build production ready assets and views", [
        "clean:dist",
        "tslint",
        "spawn:buildSpa",
        "exec:buildServer",
        "compress:dist"
    ]);

    // Used for delaying livereload until after server has restarted
    grunt.registerTask("wait", function () {

        grunt.log.ok("Waiting for server reload...");

        var done = this.async();

        setTimeout(function () {
            grunt.log.writeln("Done waiting!");
            done();
        }, 2000);
    });
    
};
