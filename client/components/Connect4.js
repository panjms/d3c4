let rows = 6
let columns = 7

class GridNode {
  constructor(val = 0, index, x, y, width, height, click) {
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
    this.click = click
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

// function createGameData(row, col) {
//   let gridDataArr = [];
//   for (let i = 0; i < row; i++) {
//     let gridRow = [];
//     for (let j = 0; j < col; j++) {
//       let circle = new GridNode(0, j)
//       gridRow.push(circle)
//     }
//     gridDataArr.push(gridRow)
//   }
//   return gridDataArr;
// }

// let gameDataGrid = createGameData(6, 7);

// function createTable(arr) {
//  let table = document.createElement('table');
//   for (let i = 0; i < arr.length; i++) {
//       let row = document.createElement('tr')
//       for (let j = 0; j < arr[0].length; j++) {
//         const col = document.createElement('td');
//         row.appendChild(col)
//       }
//       table.appendChild(row)
//   }
//     document.getElementById('grid').appendChild(table);
// }

// createTable(gameDataGrid);

function gridData() {
  let data = new Array()
  let xpos = 25 //starting xpos and ypos at 1 so the stroke will show when we make the grid below
  let ypos = 25
  let width = 50
  let height = 50

  // iterate for rows
  for (let row = 0; row < 6; row++) {
    data.push(new Array())

    // iterate for cells/columns inside rows
    for (let column = 0; column < 7; column++) {
      let datum = new GridNode(0, column, xpos, ypos, width, height)
      data[row].push(datum)
      // increment the x position. I.e. move it over by 50 (width variable)
      xpos += width
    }
    // reset the x position after a row is complete
    xpos = 25
    // increment the y position for the next row. Move it down 50 (height variable)
    ypos += height
  }
  return data
}

function emptyGridData() {
  let data = new Array()
  let xpos = 25 //starting xpos and ypos at 1 so the stroke will show when we make the grid below
  let ypos = 25
  let width = 50
  let height = 50

  // iterate for rows
  for (let row = 0; row < 6; row++) {
    data.push(new Array())

    // iterate for cells/columns inside rows
    for (let column = 0; column < 7; column++) {
      let datum = new GridNode(0, column, xpos, ypos, width, height)
      data[row].push(datum)
      // increment the x position. I.e. move it over by 50 (width variable)
      xpos += width
    }
    // reset the x position after a row is complete
    xpos = 25
    // increment the y position for the next row. Move it down 50 (height variable)
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

let playerNum = 1
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
  } else if (node.val !== 0) {
    return
  } else {
    onClick(node.down)
  }
}
function filledNode(node) {
  if (node.val !== 0) {
    return node
  } else {
    return filledNode(node.down)
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
    next = curr.left
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
    next = curr.right
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
    next = curr.up
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
      }
    }
  }
  return 0
}

let gridData = gridData()
let emptyGridData = emptyGridData()
let addedLinks = setLinks(gridData)

let emptyGrid = d3
  .select('#grid')
  .append('svg')
  .attr('class', 'empty-svg')
  .attr('width', '510px')
  .attr('height', '510px')

let emptyRow = emptyGrid
  .selectAll('.row')
  .data(emptyGridData)
  .enter()
  .append('g')
  .attr('class', 'row')

let emptyColumn = emptyRow
  .selectAll('.square')
  .data(function (d) {
    return d
  })
  .enter()
  .append('circle')
  .attr('class', 'circle')
  .attr('cx', function (d) {
    return d.x
  })
  .attr('cy', function (d) {
    return d.y
  })
  .attr('r', 22)
  .style('fill', '#fff')

let grid = d3
  .select('#grid')
  .append('svg')
  .attr('width', '510px')
  .attr('height', '510px')

let row = grid
  .selectAll('.row')
  .data(gridData)
  .enter()
  .append('g')
  .attr('class', 'row')

// let title = d3.select("#title")
//   .append("svg")
//   .attr("width", "510px")
//   .attr("height", "50px")

let column = row
  .selectAll('.square')
  .data(function (d) {
    return d
  })
  .enter()
  .append('circle')
  .attr('class', 'circle')
  .attr('cx', function (d) {
    return d.x
  })
  .attr('cy', function (d) {
    return d.y
  })
  .attr('r', 22)
  .style('fill', '#fff')
  // .attr("x", function(d) { return d.x; })
  // .attr("y", function(d) { return d.y; })
  // .attr("width", function(d) { return d.width; })
  // .attr("height", function(d) { return d.height; })
  // .style("fill", "#fff")
  // .style("stroke", "#222")
  .on('click', function (d) {
    if (d.val === 0) {
      onClick(d)
      if (d.val == 1) {
        d3.select(this)
          .attr('cx', d.x)
          .attr('cy', 0)
          .transition()
          .ease(d3.easeBounce)
          .duration(650)
          .attr('cy', d.y)
          .style('fill', '#F56C4E')
      }
      if (d.val == 2) {
        d3.select(this)
          .attr('cx', d.x)
          .attr('cy', 0)
          .transition()
          .ease(d3.easeBounce)
          .duration(650)
          .attr('cy', d.y)
          .style('fill', '#FFE600')
      }
    }
    if (checkWin(gridData) === 1) {
      console.log(1)
      d3.select('#title').style('background-color', '#F56C4E')
    }
  })
// .on('mouseover', function (d) {
//           d3.select(this).transition()
//                .duration('50')
//                .attr('opacity', '.5')
// })
// .on('mouseout', function (d, i) {
//           d3.select(this).transition()
//                .duration('50')
//                .attr('opacity', '1')
// })
