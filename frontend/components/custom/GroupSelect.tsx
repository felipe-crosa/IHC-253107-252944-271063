import { Group } from "@/app/types/group";
import { GroupSelectCard } from "./GroupSelectCard";
import { ScrollView, StyleSheet } from "react-native";

interface GroupSelectProps {
    groups: Group[];
    value: number;
    onChange: (group: number) => void;
}

export const GroupSelect = ({ groups, value, onChange } : GroupSelectProps) => {
    return (
       <ScrollView style={styles.container}>
            {groups.map((group) => (
                <GroupSelectCard 
                    key={group.id} 
                    group={group} 
                    onChange={onChange}
                    selected={group.id === value} />
            ))}
       </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 300,
          
    }
})