import { Checkbox, Text, CloseButton, Box, Input } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';

export const TodoItem = ({ id, title, completed, onToggle, onDelete, onUpdateText }) => {
  const [isInput, setIsInput] = useState(false);
  const [valueInput, setValueInput] = useState(title);

  console.log(completed);
  const handleAddTodo = (event) => {
    if (event.key === "Enter") {
      onUpdateText({
        variables: {
          id: id,
          title: valueInput,
        },
      });
      setIsInput(false);
    }
  };
  return (<>
    <Box width="100%" display={'flex'} justifyContent={'center'} alignItems={'center'}>

      <Box
        width="100%" display={'flex'} justifyContent={'space-between'} alignItems={'center'}
        spacing={2} my={2} border="1px solid grey" borderRadius="5px"
      >

        <Checkbox
          m={2} isChecked={completed}
          onChange={() => onToggle({
            variables: {
              id, completed: !completed,
            }
          })}
        />

        <Text
          wordBreak={"break-word"}
          as={completed ? 'del' : null}
        >
          {title}
        </Text>

        <EditIcon
          m={2}
          cursor={'pointer'}
          onClick={() => setIsInput(!isInput)}
        />

      </Box>
      <CloseButton
        onClick={() => onDelete({
          variables: { id }
        })}
      />
    </Box>

    {isInput ? <Input
      value={valueInput}
      onKeyPress={handleAddTodo}
      onChange={(e) => setValueInput(e.target.value)}
      textAlign={'center'}
    /> : null}

  </>);
};


