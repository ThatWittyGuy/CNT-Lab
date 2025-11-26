import java.io.*;
import java.net.*;
public class Server {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(12345);
        System.out.println("Server is waiting for connection...");

        Socket socket = serverSocket.accept();
        System.out.println("Client connected: " + socket.getInetAddress());

        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
        BufferedReader userInput = new BufferedReader(new InputStreamReader(System.in));

        String messageFromClient, messageFromServer;

        while (true) {
            messageFromClient = in.readLine();
            if (messageFromClient == null || messageFromClient.equalsIgnoreCase("bye")) {
                System.out.println("Client ended the chat.");
                break;
            }
            System.out.println("Client: " + messageFromClient);

            System.out.print("You (Server): ");
            messageFromServer = userInput.readLine();
            out.println(messageFromServer);

            if (messageFromServer.equalsIgnoreCase("bye")) {
                System.out.println("You ended the chat.");
                break;
            }
        }
        socket.close();
        serverSocket.close();
        System.out.println("Connection closed.");
    }
}
