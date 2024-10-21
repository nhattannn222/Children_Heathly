import { TouchableWithoutFeedback, View } from "react-native";
import Footer from "./navbar";

function Layout({ children }) {
  return (
    <View style={{ flex: 1 }}>
    {/* Scrollable content */}
    <View style={{ flex: 1 }}>
      {children}
    </View>

    {/* Fixed Footer */}
    <View style={{}}>
      <Footer />
    </View>
  </View>
  );
}

export default Layout;
