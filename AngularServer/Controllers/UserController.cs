using AngularServer.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularServer.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private UserType[] _user;

        public UserController()
        {
            _user = new UserType[] {
                new UserType() { Login = "king", HasPermissions = true },
                new UserType() { Login = "citizen", HasPermissions = false },
            };
        }
        [HttpGet]
        public UserType GetUser(string loginName)
        {
            var currentUser = _user.FirstOrDefault(user => user.Login.Equals(loginName));
            return currentUser;
        }
    }
}
