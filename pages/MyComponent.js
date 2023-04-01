import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  redText: {
    color: 'red',
  },
  blueText: {
    color: 'blue',
  },
});

const MyComponent = () => {
  const text = 'Hello, World!';

  return (
    <Text>
      {text.split('').map((char, index) => (
        <Text key={index} style={index % 2 === 0 ? styles.redText : styles.blueText}>
          {char}
        </Text>
      ))}
    </Text>
  );
};
export default MyComponent;
