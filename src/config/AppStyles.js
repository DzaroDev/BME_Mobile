import { StyleSheet } from "react-native";
import { COLORS } from "../Constants";

export default AppStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flexDirection: "column",
    gap: 20,
  },
  containerPadding: {
    padding: 16,
  },
  inputMainView: {
    flexDirection: "column",
    gap: 12,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
  inputView: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    borderColor: "lightgray",
    borderWidth: 0.5,
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  continueBtn: {
    width: "100%",
    backgroundColor: COLORS.DARKBLUE,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    color: "#FFF",
    fontWeight: "600",
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  emptyMessageStyle: {
    textAlign: "center",
    fontSize: 16,
  },
  logo: {
    height: 160,
    aspectRatio: 1 / 1,
    alignSelf: "center",
    // height: 120,
    // width: 120,
    // resizeMode: "center",
    // alignSelf: "center",
  },
  headerText: {
    fontWeight: "600",
    fontSize: 18,
    color: "#000",
    textTransform: "capitalize",
  },
});
