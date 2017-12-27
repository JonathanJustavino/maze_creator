const canvas = document.getElementById("can")
canvas.width = 2000
canvas.height = 2000
const ctx = canvas.getContext("2d")


function Maze(canvas, height, position, size) {
    this.canv = canvas
    this.ctx = canvas.getContext("2d")
    this.height = height
    this.position = position
    this.grid = new Array(size)
}

Maze.prototype = {
    render: function (height, position) {
        ctx.rect(position.x, position.y, height, height)
        ctx.stroke()
    },

    create: function () {
        let size = this.grid.length
        for (let i = 0; i < size; i++) {
                this.grid[i] = new Array(size)
        }
    },

    fill: function () {
        let size = this.grid.length
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                this.grid[i][j] = new Block(i,j)
            }
        }
    },

    renderBlocks: function() {
        let size = this.grid.length
        let height = size * 10
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                this.grid[i][j].draw2(i, j, height, this.ctx, this.position.x, size)
                console.log(i, j)
            }
        }
    },

    randomize: function (params) {

    }
}


function Block(x, y) {
    this.x = x
    this.y = y
}


Block.prototype = {
    draw: function (x, y, height, ctx, offset) {
        ctx.rect(x*height+offset, y*height + offset, height, height)
        ctx.stroke()
    },

    draw2: function (x, y, height, ctx, offset, size) {
        ctx.moveTo(x + offset, y + offset)
        ctx.beginPath()
        ctx.lineTo(x+offset * size, y+offset) //top
        ctx.lineTo(x+offset+size, y*height + offset) // bot
        // ctx.lineTo(x*height+offset, y*height + offset)
        ctx.stroke()
    },

    removeWall: function (x, y, height, ctx, offset, side) {
        ctx.moveTo(x + offset, y + offset)
    }
}


let size = 2
let height = size*size*10
let position = {
    x: 25,
    y: 25
}


let maze = new Maze(canvas, height, position, size)

maze.render(height, position)

maze.create()

console.log(maze.grid);

maze.fill()

console.log(maze.grid);

maze.renderBlocks()
