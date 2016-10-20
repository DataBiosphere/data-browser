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
            server: [".tmp"]
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

        // Copy Config
        // Put files not handled in other tasks here
        // copy: {
        //     staticDist: {
        //         files: [
        //             // {
        //             //     expand: true,
        //             //     src: ["public/**"],
        //             //     dest: "dist/"
        //             // }
        //         ]
        //     },
        //     dist: {
        //         files: [
        //             {
        //                 expand: true,
        //                 dot: true,
        //                 cwd: "app",
        //                 dest: "dist/assets",
        //                 src: [
        //                     "*.{ico,png,txt}",
        //                     ".htaccess",
        //                     "images/**/*.{webp,gif}",
        //                     "styles/fonts/{,*/}*.*"
        //                 ]
        //             },
        //             {
        //                 expand: true,
        //                 dot: true,
        //                 cwd: "views",
        //                 dest: "dist/views/",
        //                 src: "**/*.handlebars"
        //             },
        //             {
        //                 expand: true,
        //                 dot: true,
        //                 cwd: "app/views",
        //                 dest: "dist/assets/views/",
        //                 src: "**/*.html"
        //             },
        //             {
        //                 expand: true,
        //                 dot: true,
        //                 cwd: "app/bower_components/font-awesome/fonts",
        //                 dest: "dist/assets/fonts/",
        //                 src: "*.*"
        //             },
        //             {
        //                 expand: true,
        //                 dot: true,
        //                 cwd: "app/scripts/vendor",
        //                 dest: "dist/assets/scripts/vendor/",
        //                 src: "*.*"
        //             },
        //             {
        //                 expand: true,
        //                 dot: true,
        //                 cwd: "app/components",
        //                 dest: "dist/assets/components/",
        //                 src: "**/*.html"
        //             },
        //             {
        //                 expand: true,
        //                 dot: true,
        //                 cwd: "app/a2-components",
        //                 dest: "dist/assets/a2-components/",
        //                 src: "**/*.{js,map,html}"
        //             }
        //         ]
        //     },
        //     styles: {
        //         expand: true,
        //         dot: true,
        //         cwd: "assets/styles",
        //         dest: ".tmp/styles/",
        //         src: "{,*/}*.css"
        //     }
        // },

        // Concurrent Config
        concurrent: {
            // dist: [
            //     "copy:styles",
            //     "svgmin",
            //     "htmlmin"
            // ]
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
                NODE_ENV: "test",
                AWS_ACCESS_KEY_ID: "AKIAJGVPPYKZZ2Z6VHQQ",
                AWS_SECRET_KEY: "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",
                TZ: "UTC",
                ENCRYPTION_KEY: "/prEVE="
            },
            local: {
                NODE_ENV: "local",
                AWS_ACCESS_KEY_ID: "AKIAJGVPPYKZZ2Z6VHQQ",
                AWS_SECRET_KEY: "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",
                TZ: "UTC",
                ENCRYPTION_KEY: "ENCRYPTION_KEY"
            },
            prod: {
                NODE_ENV: "production",
                AWS_ACCESS_KEY_ID: "AKIAJGVPPYKZZ2Z6VHQQ",
                AWS_SECRET_KEY: "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",
                TZ: "UTC",
                ENCRYPTION_KEY: "ENCRYPTION_KEY"
            }
        },

        mongobackup: {
            options: {
                host: "localhost",
                port: "27017",
                db: "bw-local",
                dump: {
                    out: "./dump"
                },
                restore: {
                    path: "./dump/bw-local",
                    drop: true
                }
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
                    { src: './server/dist/**/*.js', dest: '/'},
                    { src: './dist/**/*.*', dest: '/'},
                    // { src: "./dist/**/*.js", dest: "/" },
                    // { src: "./dist/**/*.html", dest: "/" },
                    // { src: './.ebextensions/*.*', dest: '/'}

                ]
            }
        },

        exec: {
            clearTests: {
                command: "rm -rf ./test/integration/test/test-results"
            },
            buildServer: {
                command: "cd server && tsc || true"
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
        "env:local",
        "express:dev",
        "watch"
    ]);
    grunt.registerTask("start:prod", "Start working on this project!", [
        "env:prod",
        "express:prod",
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

    // Copy of mongobackup for test db
    grunt.registerTask("mongotestbackup", function (task) {

        var done = this.async();
        var args = [];
        var baseArgs = ["--host=localhost", "--port=27017", "--db=bw-test"];
        var restoreArgs = ["--drop", "./dump/bw-test"];
        var dumpArgs = ["--out=dump"];

        if (task === "dump") {
            args = baseArgs.concat(dumpArgs);
        }
        if (task === "restore") {
            args = baseArgs.concat(restoreArgs);
        }

        grunt.util.spawn({
                cmd: "mongo" + task,
                args: args,
                opts: { stdio: [ process.stdin,
                    process.stout,
                    process.stderr
                ]
                }
            },
            function (error, result) {
                if (error) {
                    grunt.log.error(result.stderr);
                }
                done();
            });
    });

    // Run tests
    grunt.registerTask("test", function (target) {

        if (target === "service") {

            return grunt.task.run([
                "env:test",
                "mongotestbackup:restore",
                "mochaTest:service"
            ]);
        }

        if (target === "api") {

            return grunt.task.run([
                "env:test",
                "mongotestbackup:restore",
                "mochaTest:api"
            ]);
        }

        if (target === "clean") {

            return grunt.task.run([
                "exec:clearTests"
            ]);
        }

    });


    // /**
    //  * Dev build task - compile less files, start watcher
    //  */
    // grunt.registerTask("dist", "Create zip file", [
    //     "compress:dist"
    // ]);
};
