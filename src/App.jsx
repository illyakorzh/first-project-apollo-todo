import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { Box, Button, useColorMode, } from '@chakra-ui/react';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (<Box
      width="100%"
      height="100%"
    >

      <Button
        marginY={2}
        width="100%"
        size="sm" colorScheme="blue" onClick={toggleColorMode}
      >
        Toggle Mode
      </Button>

      <AddTodo />
      <TodoList />
    </Box>);
}

export default App;