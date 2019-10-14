using System;
using System.Collections.Generic;
using System.Linq;
using System.Collections;
using api.Models;
using api;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PotholeController : ControllerBase
  {
    //GET api/values
    [HttpGet]
    public ActionResult<IEnumerable> Get()
    {
      var context = new DatabaseContext();
      var theAddress = context.Addresses.OrderByDescending(item => item.Id);
      return theAddress.ToList();
    }

    [HttpGet("{id}")]
    public ActionResult GetOneAddress(int Id)
    {
      var context = new DatabaseContext();
      var oneAddress = context.Addresses.FirstOrDefault(i => i.Id == Id);
      if (oneAddress == null)
      {
        return NotFound();
      }
      else
      {
        return Ok(oneAddress);
      }

    }

    [HttpPost]
    public ActionResult<Address> CreateEntry([FromBody] Address entry)
    {
      var context = new DatabaseContext();
      context.Addresses.Add(entry);
      context.SaveChanges();
      return entry;
    }

    [HttpPut("{id}")]
    public ActionResult<Address> PutAddress(int Id, [FromBody] Address newDetails)
    {
      var context = new DatabaseContext();
      if (Id != newDetails.Id)
      {
        return BadRequest();
      }
      else
      {
        context.Entry(newDetails).State = EntityState.Modified;
        context.SaveChanges();
        return newDetails;
      }

    }

    [HttpDelete("{Id}")]
    public ActionResult DeleteItem(int Id)
    {
      var context = new DatabaseContext();
      var Address = context.Addresses.FirstOrDefault(f => f.Id == Id);
      if (Address == null)
      {
        return NotFound();
      }
      else
      {
        context.Addresses.Remove(Address);
        context.SaveChanges();
        return Ok(Id);
      }

    }
  }
}