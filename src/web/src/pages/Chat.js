import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

import { BaseButton } from '../components/button'
import { BaseInput } from '../components/input'
import { useDidMount } from '../components/hook'

import { ChatAction } from '../Redux/Action'
import { createLoadingSelector } from '../Redux/Selector'

const useStyle = makeStyles({
  messagesContainer: {
    margin: '20px 0 0 0',
    height: '78vh',
    overflow: 'overlay',
    scrollBehavior: 'smooth'
  },
  messageContainer: {
    margin: '0 0 20px 0',
    display: 'block',
  },
  messageText: {
    padding: '21px 24px 20px 24px',
    background: '#88e306',
    display: 'table',
    borderRadius: '10px',
    margin: '0 0 11px 0',
    whiteSpace: 'pre-line',
    lineHeight: '25px',
    fontSize: '25px',
    color: '#fff',
    fontWeight: '500',
    maxWidth: '70%',
    '&.own': {
      marginLeft: 'auto',
      marginRight: '30px',
    },
  },
  usernameText: {
    display: 'table',
    '&.own': {
      marginLeft: 'auto',
      marginRight: '30px',
    },
  },
  formContainer: {
    display: 'flex',
  },
  divider: {
    margin: '10px 0 10px 0',
    border: '1px solid #ccd6dd',
  },
})

const Chat = (props) => {
  const {
    dispatch,
    chat,
    user,
  } = props

  const [form, setForm] = useState('')
  const [list, setList] = useState([])
  const classes = useStyle()
  const listRef = useRef(null)

  const handleOnChangeForm = (event) => setForm(event.target.value)

  const handeOnClickSend = () => {
    if (!form)
      return

    const timestamp = DateTime.utc().toString()

    setList([
      ...list,
      {
        message: form,
        sender: user.username,
        timestamp,
      }
    ])
    setForm('')
    dispatch(ChatAction.chatSend({ message: form, timestamp }))
  }

  useEffect(() => {
    dispatch(ChatAction.chatMessage({ isPageRequest: true }))
    // eslint-disable-next-line
  }, [])

  useDidMount(() => {
    setList(chat.list)
  }, [chat.list])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [list])

  useDidMount(() => {
    let isSelf = false,
      newList = list.map((value) => {
        if (
          DateTime.fromISO(value.timestamp).equals(DateTime.fromISO(chat.latest.timestamp)) &&
          chat.latest.sender === value.sender
        ) {
          isSelf = true
          return chat.latest
        }

        return value
      })

    if (!isSelf) {
      newList.push(chat.latest)
      newList.sort((current, next) => {
        const currentDate = DateTime.fromISO(current.timestamp),
          nextDate = DateTime.fromISO(next.timestamp)

        if (currentDate < nextDate)
          return -1
        if (currentDate > nextDate)
          return 1

        return 0
      })
    }

    setList(newList)
  }, [chat.latest])

  return (
    <>
      <div className={classes.messagesContainer} ref={listRef}>
        {
          list.map(({ message, sender, timestamp }) => (
            <div key={timestamp} className={classes.messageContainer}>
              <span className={clsx(classes.messageText, sender === user.username && 'own')}>{message}</span>
              <span className={clsx(classes.usernameText, sender === user.username && 'own')}>{sender === user.username ? 'You' : sender}</span>
            </div>
          ))
        }
      </div>
      <div>
        <hr className={classes.divider} />
      </div>
      <div className={classes.formContainer}>
        <BaseInput
          value={form}
          label='Start a new message'
          onChange={handleOnChangeForm}
          multiple
        />
        <BaseButton
          onClick={handeOnClickSend}
          size='small'
          variant='secondary'
        >send</BaseButton>
      </div>
    </>
  )
}

Chat.propTypes = {
  dispatch: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}


const chatMessageListLoadingSelector = createLoadingSelector(['CHAT_MESSAGE'])

const mapStateToProps = (state) => ({
  chat: state.chat,
  user: state.user,
  isMessageLoading: chatMessageListLoadingSelector(state),
})

export default connect(
  mapStateToProps,
)(Chat)