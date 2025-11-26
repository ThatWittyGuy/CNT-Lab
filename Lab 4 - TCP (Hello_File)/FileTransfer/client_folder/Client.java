import java.io.*;
import java.net.*;

public class Client {
    public static void main(String[] args) throws Exception {
        System.out.println("Connecting to server...");
        Socket socket = new Socket("localhost", 9000);
        System.out.println("Connected to server.");

        DataOutputStream dos = new DataOutputStream(socket.getOutputStream());

        File file = new File(
            "E:\\VIT PUNE '27\\T.Y - SEM 1\\CNT-Lab\\Lab 4 - TCP (Hello_File)\\FileTransfer\\client_folder\\t.txt"
        );

        FileInputStream fis = new FileInputStream(file);

        System.out.println("Sending file: " + file.getName() + " (" + file.length() + " bytes)");
        dos.writeLong(file.length());

        byte[] buffer = new byte[4096];
        int read;
        long totalSent = 0;
        while ((read = fis.read(buffer)) > 0) {
            dos.write(buffer, 0, read);
            totalSent += read;
            System.out.println("Sent " + totalSent + " of " + file.length() + " bytes.");
        }

        System.out.println("File sent successfully.");
        fis.close();
        dos.close();
        socket.close();
        System.out.println("Connection closed.");
    }
}
