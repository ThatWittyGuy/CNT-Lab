// import java.net.DatagramPacket;
// import java.net.DatagramSocket;
// import java.net.InetAddress;

// public class HelloClient {
//     public static void main(String[] args) throws Exception {
//         DatagramSocket socket = new DatagramSocket();
//         InetAddress serverAddress = InetAddress.getByName("127.0.0.1");

//         // Send message
//         String message = "Hello from Client!";
//         byte[] sendData = message.getBytes();
//         DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, serverAddress, 9999);
//         socket.send(sendPacket);

//         // Receive reply
//         byte[] buffer = new byte[1024];
//         DatagramPacket receivePacket = new DatagramPacket(buffer, buffer.length);
//         socket.receive(receivePacket);

//         String serverReply = new String(receivePacket.getData(), 0, receivePacket.getLength());
//         System.out.println("Server says: " + serverReply);

//         socket.close();
//     }
// }


//**************************Client.Java************************************
import java.net.*;
import java.util.Scanner;

public class HelloClient {
	public static void main(String[] args) {
        try {
            DatagramSocket clientSocket = new DatagramSocket(); // Create client socket
            InetAddress serverAddress = InetAddress.getByName("localhost"); // Server IP
            Scanner scanner = new Scanner(System.in);
            byte[] sendData;
            byte[] receiveData = new byte[1024];

            while (true) {
                // Ask client user to enter a message
                System.out.print("You (Client): ");
                String message = scanner.nextLine();
                sendData = message.getBytes();

                // Send message to server
                DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, serverAddress, 9876);
                clientSocket.send(sendPacket);

                if (message.equalsIgnoreCase("bye")) {
                    System.out.println("You exited the chat.");
                    break;
                }

                // Receive server reply
                DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
                clientSocket.receive(receivePacket);
                String serverReply = new String(receivePacket.getData(), 0, receivePacket.getLength());

                System.out.println("Server: " + serverReply);

                if (serverReply.equalsIgnoreCase("bye")) {
                    System.out.println("Server exited the chat.");
                    break;
                }
            }

            clientSocket.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
