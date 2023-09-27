import { useState } from 'react';
import './App.css';

function App() {
  const [boards, setBoards] = useState([
    { id: 1, title: "Сделать", items: [{ id: 1, title: "Выучить Redux" }, { id: 2, title: "Выучить Webpack" }, { id: 3, title: "Выучить Jest" }] },
    { id: 2, title: "Проверить", items: [{ id: 4, title: "Код ревью" }, { id: 5, title: "Задача на сортировку" }, { id: 6, title: "Задачи на фибоначи" }] },
    { id: 3, title: "Сделано", items: [{ id: 7, title: "Сходить в магазин" }, { id: 8, title: "Убраться" }, { id: 9, title: "Покрасить стол" }] }
  ])
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)

  const dragOverHandler = (event) => {
    event.preventDefault()
    if (event.target.className === "item") {
      event.target.style.boxShadow = "0 4px 3px gray"
    }
  }
  const dragLeaveHandler = (event) => {
    event.target.style.boxShadow = "none"
  }

  const dragStartHandler = (event, board, item) => {
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  const dragEndHandler = (event) => {
    event.target.style.boxShadow = "none"
  }

  const dropHandler = (event, board, item) => {
    event.preventDefault()
    const currentIntex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIntex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
    event.target.style.boxShadow = "none"
  }

  const dropCardHandler = (event, board) => {
    board.items.push(currentItem)
    const currentIntex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIntex, 1)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
    event.target.style.boxShadow = "none"
  }

  return (
    <div className="app">
      {boards.map(board =>
        <div
          onDragOver={(event) => dragOverHandler(event)}
          onDrop={(event) => dropCardHandler(event, board)}
          className="board">
          <div className="board__title">{board.title}</div>
          {
            board.items.map(item =>
              <div
                onDragOver={(event) => dragOverHandler(event)}
                onDragLeave={(event) => dragLeaveHandler(event)}
                onDragStart={(event) => dragStartHandler(event, board, item)}
                onDragEnd={(event) => dragEndHandler(event)}
                onDrop={(event) => dropHandler(event, board, item)}
                draggable={true}
                className="item"
              >
                {item.title}</div>
            )
          }
        </div >
      )
      }
    </div >
  );
}

export default App;
