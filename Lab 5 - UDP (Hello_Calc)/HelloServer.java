// import java.net.DatagramPacket;
// import java.net.DatagramSocket;

// public class HelloServer {
//     public static void main(String[] args) throws Exception {
//         DatagramSocket socket = new DatagramSocket(9999);
//         System.out.println("UDP Hello Server is running...");

//         byte[] buffer = new byte[1024];
//         DatagramPacket packet = new DatagramPacket(buffer, buffer.length);

//         // Receive from client
//         socket.receive(packet);
//         String message = new String(packet.getData(), 0, packet.getLength());
//         System.out.println("Client says: " + message);

//         // Send response back
//         String reply = "Hello from Server!";
//         byte[] sendData = reply.getBytes();
//         DatagramPacket sendPacket = new DatagramPacket(
//                 sendData, sendData.length, packet.getAddress(), packet.getPort());
//         socket.send(sendPacket);

//         socket.close();
//     }
// }


//**************************Server.Java************************************
import java.net.*;
import java.util.Scanner;

public class HelloServer {
	public static void main(String[] args) {
        try {
            DatagramSocket serverSocket = new DatagramSocket(9876); // Server socket on port 9876
            Scanner scanner = new Scanner(System.in);
            byte[] receiveData = new byte[1024];
            byte[] sendData;

            System.out.println("Server is running...");

            while (true) {
                // Receive message from client
                DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
                serverSocket.receive(receivePacket);
                String clientMessage = new String(receivePacket.getData(), 0, receivePacket.getLength());

                System.out.println("Client: " + clientMessage);

                if (clientMessage.equalsIgnoreCase("bye")) {
                    System.out.println("Client exited the chat.");
                    break;
                }

                // Ask server user to type a reply
                System.out.print("You (Server): ");
                String reply = scanner.nextLine();
                sendData = reply.getBytes();

                // Send response to client
                InetAddress clientAddress = receivePacket.getAddress();
                int clientPort = receivePacket.getPort();
                DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, clientAddress, clientPort);
                serverSocket.send(sendPacket);

                if (reply.equalsIgnoreCase("bye")) {
                    System.out.println("Server exited the chat.");
                    break;
                }
            }

            serverSocket.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
