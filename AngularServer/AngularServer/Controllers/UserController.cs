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
    public class UserController : Controller
    {
        private UserType[] _user;

        public UserController()
        {
            _user = new UserType[] {
                new UserType() { Login = "king", HasPermissions = true },
                new UserType() { Login = "citizen", HasPermissions = false },
            };
        }
        [HttpPost]
        public UserType GetUser(bool selectedType)
        {
            var currentUser = _user[selectedType ? 0 : 1];
            return currentUser;
        }
    }
}
