let ImageSetsProcess = require('../obj/src/container/ImageSetsProcess').ImageSetsProcess;

try {
    new ImageSetsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
