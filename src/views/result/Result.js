import React from 'react'
import "./result.scss"

const ResultItem = (props) => {
  const classList = "result-item " + (props.special ? "special" : "")
  return (
    <div  className={classList}>
      <div className="title">{props.title}</div>
      <div className="content">
        <img className="avatar" src={props.avatar} alt="头像" />
        <div className="name">{props.name}</div>
      </div>
    </div>
  )
}
const avatar = 'https://is3-ssl.mzstatic.com/image/thumb/Purple118/v4/a5/79/8b/a5798b6e-d959-6602-e0ec-ae63785da97f/AppIcon-0-1x_U007emarketing-0-0-85-220-0-7.png/246x0w.png'

export const Result = (props) => {
  // const type = props.match.query.type
  const data = [...Array(4)].fill({
    title: '一等奖',
    name: '谢谢',
    avatar: avatar
  })
  return (
    <div className="result">
      {
        data.map((item, i) => ( 
          <ResultItem
            title={item.title}
            name={item.name}
            avatar={item.avatar}
            special={data.length===1}
            key={'item' + i}
          />
        ))
      }
    </div>
  )
}