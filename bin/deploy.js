const exec = require('child_process').exec
const fs = require('fs');
const args = require('minimist')(process.argv.slice(2))
const graphicConfig = require('../graphic_config.js').configureTargets(args.target);

const bucket = graphicConfig.S3_BUCKET;

const s3Path = `s3://${bucket}/dailygraphics/graphics/${graphicConfig.SLUG}`

exec(`aws s3 sync dist ${s3Path} --acl public-read`, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`)
        return
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
})

