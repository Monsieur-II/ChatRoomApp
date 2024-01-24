using Microsoft.AspNetCore.SignalR;

namespace ChatRoomApp.Hubs;

public class ChatHub : Hub
{
    private static Dictionary<string, string> _connectedClients = new Dictionary<string, string>();

    // this method will send notifications to all clients
    // so when a client wants to send a message, it will call this method
    // if client has to receive notification from server, the <ReceiveMessage> method is used

    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    // Everyone will be notified when a client joins chat, except the client him/herself
    // *Client.Others*
    public async Task JoinChat(string user, string message)
    {
        _connectedClients[Context.ConnectionId] = user;
        await Clients.Others.SendAsync("ReceiveMessage", user, message);
    }

    // Called by OnDisconnectedAsync method when a client logs off
    public async Task LeaveChat()
    {
        if (_connectedClients.TryGetValue(Context.ConnectionId, out string? user))
        {
            var message = $"{user} left the chat";
            await Clients.Others.SendAsync("ReceiveMessage", user, message);
        }
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await LeaveChat();
        await base.OnDisconnectedAsync(exception);
    }
}
