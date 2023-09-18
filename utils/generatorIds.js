const sequential = require('sequential-ids');

const generator = new sequential.Generator({
    letters: 3,
    restore: "000"
});

generator.start();


module.exports = generator