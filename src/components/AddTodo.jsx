import { useState } from 'react';
import { Box, Input, } from '@chakra-ui/react';
import { useMutation } from '@apollo/client'
import { ADD_TODO, ALL_TODO } from '../apollo/todos';

const AddTodo = () => {
  const [text, setText] = useState('');

  const [addTodo, {error}] = useMutation(ADD_TODO, {
    update(cache, { data: { newTodo } }) {
      const { todos } = cache.readQuery({ query: ALL_TODO });

      cache.writeQuery({
        query: ALL_TODO,
        data: {
          todos: [newTodo, ...todos]
        }
      })
    }
  });

  const handleAddTodo = (event) => {
    if (event.key === "Enter") {
      addTodo({
        variables: {
          title: text,
          completed: false,
          userId: 1,
        },
      });
      setText('');
    }
  }


  if (error) {
    return <h2>Error...</h2>
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
    >
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleAddTodo}
        textAlign={'center'}
        placeholder="write your task"
      />

    </Box>
  );
};

export default AddTodo;
