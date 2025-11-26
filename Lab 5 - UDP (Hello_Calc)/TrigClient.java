import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.Scanner;

public class TrigClient {
    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket();
        InetAddress serverAddress = InetAddress.getByName("127.0.0.1");
        Scanner sc = new Scanner(System.in);

        System.out.println("Select Operation:");
        System.out.println("1: sin");
        System.out.println("2: cos");
        System.out.println("3: tan");
        String op = sc.nextLine();

        System.out.print("Enter angle in degrees: ");
        double angle = sc.nextDouble();

        String message = op + " " + angle;
        byte[] sendData = message.getBytes();
        DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, serverAddress, 8888);
        socket.send(sendPacket);

        // Receive response
        byte[] buffer = new byte[1024];
        DatagramPacket receivePacket = new DatagramPacket(buffer, buffer.length);
        socket.receive(receivePacket);

        String result = new String(receivePacket.getData(), 0, receivePacket.getLength());
        System.out.println("Result from server: " + result);

        socket.close();
        sc.close();
    }
}
