import { VStack } from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_TODO, UPDATE_TODO, DELETE_TODO, UPDATE_TODO_TEXT } from '../apollo/todos';
import { TodoItem } from './TodoItem';


const TodoList = () => {
  const { loading, error, data } = useQuery(ALL_TODO);
  const [toggleTodo, { error: updateError }] = useMutation(UPDATE_TODO);
  const [updateText, { error: updateErrorText }] = useMutation(UPDATE_TODO_TEXT);
  const [removeTodo, { error: removeError }] = useMutation(DELETE_TODO, {
    update(cache, { data: { removeTodo } }) {
      cache.modify({
        fields: {
          allTodos(currentTodos = []) {
            return currentTodos.filter(todo => todo.__ref !== `Todo:${removeTodo.id}`);
          }
        }
      });
    }
  });

  if (error || updateError || removeError || updateErrorText) {
    console.log("error",error );
    // console.log("updateError", updateError );
    // console.log("removeError", removeError );
    // console.log("updateErrorText", updateErrorText);
    return <h2>Error...</h2>;
  }

  return (<VStack spacing={2} mt={4}>
      {data?.todos?.map((todo) => (<TodoItem
        key={todo.id}
        onToggle={toggleTodo}
        onDelete={removeTodo}
        onUpdateText={updateText}
        {...todo}
      />))}
    </VStack>

  );
};

export default TodoList;
