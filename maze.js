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
}

const TOP = 1
const LEFT = 2
const BOTH = TOP | LEFT


function MazeData(size) {
    this.grid = new Array(size * size)
    this.grid.fill(BOTH)
    this.size = size
    this.directions = {
        0: -1,
        1: 1,
        2: -this.size,
        3: this.size,
    }
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
        // console.log(s);
    },

    path: function () {
        for (let i = 0; i < this.size; i++) {
            this.grid
        }
    },

    rand: function (previous, pos) {
        let left = pos - 1
        let posRight = pos + 1
        let up = pos - this.row
        let down = pos + this.row

    }
}


let size = 20
let height = size*size
let position = {
    x: 50,
    y: 50
}


let maze = new Maze(canvas, height, position, 10)

maze.render()


/**
 *
 * Directions to choose in a maze
 * X  - Actual Position
 * S  - Size of a row of the maze
 * CP - Current Position
 * P  - Next Position
 *
 * +-------++-------++-------++
 * |       || X - S ||       ||
 * +-------++-------++-------++
 * | X - 1 ||   X   || X + 1 ||
 * +-------++-------++-------++
 * |       || X + S ||       ||
 * +-------++-------++-------++
 *
 * Function: chooseDirection()
 * conclude from chosen direction
 * which wall to delete
 * X < P
 *  | X + 1 == P -> delete P's left wall
 *  | -> delete P's top wall
 * X > P
 *  | X - 1 == P -> delete X's left wall
 *  | -> delete X's top wall
 *
 * End when at Position maze[size of maze]
 */



function ran(maze) {
    let size = maze.length
    let sizeOfRow = Math.sqrt(size)
    let path = []
    let pos = 0
    for (let i = 0; i < size; i++) {
        path.push(pos)
        // console.log(path);
        let next = chooseDirection(sizeOfRow, pos)
        // console.log(next);

        pos = next
    }
}



ran(maze.maze.grid)


function chooseDirection(sizeOfRow, pos) {
    let posLeft = pos - 1
    let posRight = pos + 1
    let up = pos - sizeOfRow
    let down = pos + sizeOfRow
    let DIR = {
        0: posRight,
        1: posLeft,
        2: up,
        3: down,
    }
    if (pos == 0 || up < 0) {
        if(posLeft < 0){
            return posRight
        }
        return DIR[Math.floor(Math.random() * 10) % 2]
    }

    return DIR[Math.floor(Math.random() * 10) % 4]
}
