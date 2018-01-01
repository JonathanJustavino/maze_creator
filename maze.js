const canvas = document.getElementById("can")
canvas.width = 2000
canvas.height = 2000
const ctx = canvas.getContext("2d")


function Maze(canvas, height, position, size) {
    this.canv = canvas
    this.ctx = canvas.getContext("2d")
    this.height = height
    this.position = position
    this.maze = new MazeData(size)
    this.maze.fillRandom()
}

Maze.prototype = {
    render: function () {
        ctx.rect(this.position.x, this.position.y, this.height, this.height)
        ctx.stroke()
        this.renderBlocks()
    },

    renderBlocks: function() {
        let size = this.maze.size
        let blocksize = this.height / size
        let xPos = this.position.x
        for (let x = 0; x < size; x++, xPos+=blocksize) {
            let yPos = this.position.y
            for (let y = 0; y < size; y++, yPos+=blocksize) {
                if(this.maze.isTop(x, y)) {
                    this.ctx.beginPath()
                    this.ctx.moveTo(xPos, yPos)
                    this.ctx.lineTo(xPos + blocksize, yPos)
                    this.ctx.stroke()
                }
                if(this.maze.isLeft(x, y)) {
                    this.ctx.beginPath()
                    this.ctx.moveTo(xPos, yPos)
                    this.ctx.lineTo(xPos, yPos + blocksize)
                    this.ctx.stroke()
                }
            }
        }
    },

    randomize: function (params) {

    }
}

const TOP = 1
const LEFT = 2
const BOTH = TOP | LEFT


function MazeData(size) {
    this.grid = new Array(size * size)
    this.grid.fill(BOTH)
    this.size = size
}

MazeData.prototype = {

    getBlock: function (x, y) {
        return this.grid[x * this.size + y]
    },

    setBlock: function (x, y, block) {
        this.grid[x * this.size + y] = block
    },

    isTop: function (x, y) {
        return this.getBlock(x, y) & TOP
    },

    isLeft: function (x, y) {
        return this.getBlock(x, y) & LEFT
    },

    setTop: function (x, y, isSet) {
        if (isSet) {
            this.setBlock(x, y, this.getBlock() | TOP)
            return
        }
        this.setBlock(x, y, this.getBlock(x, y) & ~TOP)
    },

    setLeft: function (x, y, isSet) {
        if (isSet) {
            this.setBlock(x, y, this.getBlock() | LEFT)
            return
        }
        this.setBlock(x, y, this.getBlock(x, y) & ~LEFT)
    },

    fillRandom: function () {
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                this.setTop(x, y, (y == 0) ? false : Math.random() >= 0.4)
                this.setLeft(x, y, (x == 0) ? false : Math.random() >= 0.4)
            }
        }
        this.dump()
    },

    dump: function () {
        let s  = ''
        for (let y = 0; y < this.size; y++, s+='\n') {
            for (let x = 0; x < this.size; x++) {
                s+=this.getBlock(x,y)
            }
        }
        console.log(s);
    }
}


let size = 30
let height = size*size
let position = {
    x: 25,
    y: 25
}


let maze = new Maze(canvas, height, position, size)

maze.render()
