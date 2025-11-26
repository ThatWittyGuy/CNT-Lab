import java.io.*;
import java.net.*;

public class Server {
    public static void main(String[] args) throws Exception {
        System.out.println("Waiting for connection...");
        ServerSocket serverSocket = new ServerSocket(9000);
        Socket socket = serverSocket.accept();
        System.out.println("Client connected.");

        DataInputStream dis = new DataInputStream(socket.getInputStream());

        FileOutputStream fos = new FileOutputStream(
            "E:\\VIT PUNE '27\\T.Y - SEM 1\\CNT-Lab\\Lab 4 - TCP (Hello_File)\\FileTransfer\\server_folder\\t.txt"
        );

        long fileSize = dis.readLong();
        System.out.println("Receiving file of size: " + fileSize + " bytes.");

        byte[] buffer = new byte[4096];
        int read;
        long totalRead = 0;
        while ((read = dis.read(buffer, 0, Math.min(buffer.length, (int)(fileSize - totalRead)))) > 0) {
            fos.write(buffer, 0, read);
            totalRead += read;
            System.out.println("Received " + totalRead + " of " + fileSize + " bytes.");
            if (totalRead == fileSize) break;
        }

        System.out.println("File received and saved to t.txt in the new folder.");
        fos.close();
        dis.close();
        socket.close();
        serverSocket.close();
        System.out.println("Connection closed.");
    }
}
