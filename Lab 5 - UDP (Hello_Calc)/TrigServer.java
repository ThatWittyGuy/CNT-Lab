import java.net.DatagramPacket;
import java.net.DatagramSocket;

public class TrigServer {
    public static void main(String[] args) throws Exception {
        final double PI = 3.14159265;
        DatagramSocket socket = new DatagramSocket(8888);
        System.out.println("UDP Trigonometry Server running...");

        byte[] buffer = new byte[1024];

        while (true) {
            DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
            socket.receive(packet);

            String data = new String(packet.getData(), 0, packet.getLength());
            String[] parts = data.split(" ");
            String op = parts[0];
            double angle = Double.parseDouble(parts[1]);
            double result;

            // Convert degrees to radians
            double rad = angle * PI / 180;

            switch (op) {
                case "1": result = Math.sin(rad); break;
                case "2": result = Math.cos(rad); break;
                case "3": result = Math.tan(rad); break;
                default: result = Double.NaN;
            }

            String reply = String.valueOf(result);
            byte[] sendData = reply.getBytes();

            DatagramPacket sendPacket = new DatagramPacket(
                    sendData, sendData.length, packet.getAddress(), packet.getPort());
            socket.send(sendPacket);

            System.out.println("Processed: op=" + op + " angle=" + angle + " result=" + result);
        }
    }
}
