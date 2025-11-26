import java.io.*;
import java.net.*;

public class Client {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket("127.0.0.1", 12345);

        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
        BufferedReader userInput = new BufferedReader(new InputStreamReader(System.in));

        String messageFromServer, messageFromClient;

        while (true) {
            System.out.print("You (Client): ");
            messageFromClient = userInput.readLine();
            out.println(messageFromClient);
            if (messageFromClient.equalsIgnoreCase("bye")) {
                System.out.println("You ended the chat.");
                break;
            }
            messageFromServer = in.readLine();
            if (messageFromServer == null || messageFromServer.equalsIgnoreCase("bye")) {
                System.out.println("Server ended the chat.");
                break;
            }
            System.out.println("Server: " + messageFromServer);
        }
        socket.close();
        System.out.println("Connection closed.");
    }
}
