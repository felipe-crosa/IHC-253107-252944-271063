import { Category } from "@/app/types/category";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const COLOR_PALETTE = [
    { background: '#f3e8ff', text: '#8200db' }, 
    { background: '#dbeafe', text: '#1447e6' }, 
    { background: '#ffedd4', text: '#ca3500' }, 
    { background: '#ffe4e6', text: '#c70036' }, 
    { background: '#dcfce7', text: '#008236' },
    { background: '#ffe2e2', text: '#c10007' },
    { background: '#fef9c2', text: '#a65f00' }, 
    { background: '#f3f4f6', text: '#364153' },
  ];

const getCategoryColor = (index: number) => {
    return COLOR_PALETTE[index % COLOR_PALETTE.length];
};

interface CategoryButtonProps {
    category: Category;
    index: number;
    value?: number;
    onChange: (categoryId: number) => void;
}

export const CategoryButton = ({ category, index, value, onChange } : CategoryButtonProps) => {
    const isSelected = value === category.id;
    const colors = getCategoryColor(index);

    return (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryButton,
            { backgroundColor: colors.background },
            isSelected && { 
                ...styles.selectedCategory,
                borderColor: colors.text 
            }
          ]}
          onPress={() => onChange(category.id)}
          activeOpacity={0.7}
        >
          <Text style={[styles.categoryText, { color: colors.text }]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
    categoryButton: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 44,
    },
    selectedCategory: {
      borderWidth: 2,
      borderColor: '#8B5CF6',
    },
    categoryText: {
      fontSize: 14,
      fontWeight: '500',
    },
  });