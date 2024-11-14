import { NewTodo } from '@/components/NewTodo';
import { TodoList } from '@/components/TodoList';
import { generateId } from '@/core/generateId';
import { Todo } from '@/core/keelClient';
import { use$, useObservable } from '@legendapp/state/react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TodosProps {
    idUser: string;
}

export function Todos(props: TodosProps) {
    const todos$ = useObservable<Todo[]>([]);
    const todos = use$(todos$);

    const addTodo = (text: string) => {
        todos$.push({
            id: generateId(),
            text,
            idUser: props.idUser,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as Todo);
    };
    const updateTodo = (todo: Todo) => {
        const idx = todos$.peek().findIndex((t) => t.id === todo.id);
        todos$[idx].set(todo);
    };
    const deleteTodo = (id: string) => {
        // todos$.set(todos.filter((t) => t.id !== id));
        const idx = todos$.peek().findIndex((t) => t.id === id);
        todos$.splice(idx, 1);
    };

    console.log('1 - Todos');

    return (
        <View>
            <Text style={styles.heading}>Todos</Text>
            <NewTodo addTodo={addTodo} />
            <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 16,
    },
});
