import { useObservable, use$ } from '@legendapp/state/react';
import React from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputSubmitEditingEventData } from 'react-native';

interface NewTodoProps {
    addTodo: (text: string) => void;
}

export const NewTodo = ({ addTodo }: NewTodoProps) => {
    const text$ = useObservable('');
    const text = use$(text$);
    const handleSubmitEditing = ({ nativeEvent: { text } }: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        text$.set('');
        addTodo(text);
    };

    console.log('4 - NewTodo');

    return (
        <TextInput
            value={text}
            onChangeText={(text) => text$.set(text)}
            onSubmitEditing={handleSubmitEditing}
            placeholder="What do you want to do?"
            style={styles.input}
        />
    );
};

// Styles for the app.
const styles = StyleSheet.create({
    input: {
        borderColor: '#999',
        borderRadius: 8,
        borderWidth: 2,
        flex: 0,
        height: 64,
        marginBottom: 16,
        padding: 16,
        fontSize: 20,
    },
});
