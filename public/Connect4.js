let rows = 6
let columns = 7
let playerNum = 1
let winningPlayer = 0

class GridNode {
  constructor(val = 0, index, x, y, width, height) {
    this.val = val
    this.index = index
    this.left = null
    this.right = null
    this.up = null
    this.down = null
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  setLeft(left) {
    this.left = left
  }
  setRight(right) {
    this.right = right
  }
  setUp(up) {
    this.up = up
  }
  setDown(down) {
    this.down = down
  }
}

function makeGridData() {
  let data = []
  let xpos = 80
  let ypos = 80
  let width = 120
  let height = 120

  for (let row = 0; row < 6; row++) {
    data.push([])

    for (let column = 0; column < 7; column++) {
      let datum = new GridNode(0, column, xpos, ypos, width, height)
      data[row].push(datum)
      xpos += width
    }
    xpos = 80
    ypos += height
  }
  return data
}

function makeEmptyGridData() {
  let data = []
  let xpos = 80
  let ypos = 80
  let width = 120
  let height = 120

  for (let row = 0; row < 6; row++) {
    data.push([])
    for (let column = 0; column < 7; column++) {
      let datum = new GridNode(0, column, xpos, ypos, width, height)
      data[row].push(datum)
      xpos += width
    }
    xpos = 80
    ypos += height
  }
  return data
}

function setLinks(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (j > 0) {
        arr[i][j].setLeft(arr[i][j - 1])
      }
      if (j < arr[i].length - 1) {
        arr[i][j].setRight(arr[i][j + 1])
      }
      if (i > 0) {
        arr[i][j].setUp(arr[i - 1][j])
      }
      if (i < arr.length - 1) {
        arr[i][j].setDown(arr[i + 1][j])
      }
    }
  }
}

function onClick(node) {
  if (node.val === 0) {
    if (node.down === null || node.down.val !== 0) {
      node.val = playerNum
      if (playerNum === 1) {
        playerNum = 2
      } else {
        playerNum = 1
      }
    }
  }
}

function checkLeft(node) {
  let arr = []
  let curr = node
  let next = curr.left
  while (curr !== null) {
    if (arr.length === 0 || curr.val === arr[0]) {
      arr.push(curr.val)
    } else {
      break
    }
    curr = next
    if (curr === null) {
      next = null
    } else {
      next = curr.left
    }
  }
  if (arr.length >= 4) {
    return arr[0]
  }
  return 0
}

function checkRight(node) {
  let arr = []
  let curr = node
  let next = curr.right
  while (curr !== null) {
    if (arr.length === 0 || curr.val === arr[0]) {
      arr.push(curr.val)
    } else {
      break
    }
    curr = next
    if (curr === null) {
      next = null
    } else {
      next = curr.right
    }
  }
  if (arr.length >= 4) {
    return arr[0]
  }
  return 0
}

function checkUp(node) {
  let arr = []
  let curr = node
  let next = curr.up
  while (curr !== null) {
    if (arr.length === 0 || curr.val === arr[0]) {
      arr.push(curr.val)
    } else {
      break
    }
    curr = next
    if (curr === null) {
      next = null
    } else {
      next = curr.up
    }
  }
  if (arr.length >= 4) {
    return arr[0]
  }
  return 0
}

function checkUpLeft(node) {
  let arr = []
  let curr = node
  let next = curr.up.left
  while (curr !== null) {
    if (arr.length === 0 || curr.val === arr[0]) {
      arr.push(curr.val)
    } else {
      break
    }
    curr = next
    if (curr === null) {
      next = null
    } else {
      next = curr.up.left
    }
  }
  if (arr.length >= 4) {
    return arr[0]
  }
  return 0
}

function checkUpRight(node) {
  let arr = []
  let curr = node
  let next = curr.up.right
  while (curr !== null) {
    if (arr.length === 0 || curr.val === arr[0]) {
      arr.push(curr.val)
    } else {
      break
    }
    curr = next
    if (curr === null) {
      next = null
    } else {
      next = curr.up.right
    }
  }
  if (arr.length >= 4) {
    return arr[0]
  }
  return 0
}

function checkWin(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j < arr[i].length; j++) {
      let position = arr[i][j]
      if (position.val !== 0) {
        if (checkLeft(position) !== 0) {
          return checkLeft(position)
        }
        if (checkRight(position) !== 0) {
          return checkRight(position)
        }
        if (checkUp(position) !== 0) {
          return checkUp(position)
        }
        if (checkUpLeft(position) !== 0) {
          return checkUpLeft(position)
        }
        if (checkUpRight(position) !== 0) {
          return checkUpRight(position)
        }
      }
    }
  }
  return 0
}

let gridData = makeGridData()
let emptyGridData = makeEmptyGridData()
setLinks(gridData)

let emptyGrid = d3
  .select('#grid')
  .append('svg')
  .attr('class', 'empty-svg')
  .attr('width', '880px')
  .attr('height', '760px')

let emptyRow = emptyGrid
  .selectAll('.row')
  .data(emptyGridData)
  .enter()
  .append('g')
  .attr('class', 'row')

emptyRow
  .selectAll('.circle')
  .data(function(d) {
    return d
  })
  .enter()
  .append('circle')
  .attr('class', 'circle')
  .attr('cx', function(d) {
    return d.x
  })
  .attr('cy', function(d) {
    return d.y
  })
  .attr('r', 50)
  .style('fill', '#fff')

let grid = d3
  .select('#grid')
  .append('svg')
  .attr('class', 'game-svg')
  .attr('width', '880px')
  .attr('height', '760px')

let row = grid
  .selectAll('.row')
  .data(gridData)
  .enter()
  .append('g')
  .attr('class', 'row')

row
  .selectAll('.circle')
  .data(function(d) {
    return d
  })
  .enter()
  .append('circle')
  .attr('class', 'circle')
  .attr('cx', function(d) {
    return d.x
  })
  .attr('cy', function(d) {
    return d.y
  })
  .attr('r', 50)
  .style('fill', '#fff')
  .on('mouseover', function(e, d) {
    if (d.val === 0) {
      if (d.down === null || d.down.val !== 0) {
        if (playerNum === 1) {
          d3
            .select(this)
            .style('fill', '#F56C4E')
            .attr('opacity', 1 / 2)
        } else if (playerNum === 2) {
          d3
            .select(this)
            .style('fill', '#FFE600')
            .attr('opacity', 1 / 2)
        }
      }
    }
  })
  .on('mouseout', function(e, d) {
    if (d.val === 0) {
      if (d.down === null || d.down.val !== 0) {
        if (playerNum === 1) {
          d3
            .select(this)
            .style('fill', '#fff')
            .attr('opacity', 1)
        } else if (playerNum === 2) {
          d3
            .select(this)
            .style('fill', '#fff')
            .attr('opacity', 1)
        }
      }
    }
  })
  .on('click', function(e, d) {
    if (d.val === 0 && winningPlayer === 0) {
      onClick(d)
      if (d.val == 1) {
        d3
          .select(this)
          .attr('cx', d.x)
          .attr('cy', 0)
          .transition()
          .ease(d3.easeBounce)
          .duration(650)
          .attr('cy', d.y)
          .style('fill', '#F56C4E')
          .attr('opacity', '1')
      }
      if (d.val == 2) {
        d3
          .select(this)
          .attr('cx', d.x)
          .attr('cy', 0)
          .transition()
          .ease(d3.easeBounce)
          .duration(650)
          .attr('cy', d.y)
          .style('fill', '#FFE600')
          .attr('opacity', '1')
      }
    }
    if (winningPlayer === 0 && checkWin(gridData) !== 0) {
      if (playerNum === 1) {
        winningPlayer = 2
      } else {
        winningPlayer = 1
      }
      d3
        .select('#title')
        .style(
          'background-color',
          winningPlayer === 1
            ? '#F56C4E'
            : winningPlayer === 2 ? '#FFE600' : '#fff'
        )
      d3
        .select('#win-div')
        .text(`Player ${winningPlayer} wins!`)
        .style('background-color', winningPlayer === 1 ? '#F56C4E' : '#FFE600')
    }
  })

let button = document.querySelector('button')
button.addEventListener('click', () => window.location.reload())
